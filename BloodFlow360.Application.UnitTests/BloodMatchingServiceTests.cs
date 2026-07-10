using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BloodFlow360.Application.DTOs.BloodMatching;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Services;
using FluentAssertions;
using Moq;
using Xunit;

namespace BloodFlow360.Application.UnitTests
{
    public class BloodMatchingServiceTests
    {
        private readonly Mock<IBloodMatchingRepository> _repositoryMock;
        private readonly BloodMatchingService _service;

        public BloodMatchingServiceTests()
        {
            _repositoryMock = new Mock<IBloodMatchingRepository>();
            _service = new BloodMatchingService(_repositoryMock.Object);
        }

        [Theory]
        [InlineData("O-", new[] { "O-" })]
        [InlineData("O+", new[] { "O+", "O-" })]
        [InlineData("A-", new[] { "A-", "O-" })]
        [InlineData("A+", new[] { "A+", "A-", "O+", "O-" })]
        [InlineData("B-", new[] { "B-", "O-" })]
        [InlineData("B+", new[] { "B+", "B-", "O+", "O-" })]
        [InlineData("AB-", new[] { "AB-", "A-", "B-", "O-" })]
        [InlineData("AB+", new[] { "AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-" })]
        public void GetCompatibleBloodGroups_ShouldReturnCorrectCompatibleGroups_ForValidBloodGroup(
            string requestedGroup, string[] expectedCompatibleGroups)
        {
            // Act
            var result = _service.GetCompatibleBloodGroups(requestedGroup);

            // Assert
            result.Should().NotBeNull();
            result.RequestedBloodGroup.Should().Be(requestedGroup);
            result.CompatibleBloodGroups.Should().BeEquivalentTo(expectedCompatibleGroups);
        }

        [Fact]
        public void GetCompatibleBloodGroups_ShouldTrimAndUppercaseInput()
        {
            // Act
            var result = _service.GetCompatibleBloodGroups("  ab-  ");

            // Assert
            result.Should().NotBeNull();
            result.RequestedBloodGroup.Should().Be("AB-");
            result.CompatibleBloodGroups.Should().BeEquivalentTo(new[] { "AB-", "A-", "B-", "O-" });
        }

        [Fact]
        public void GetCompatibleBloodGroups_ShouldThrowException_WhenBloodGroupIsInvalid()
        {
            // Act
            Action act = () => _service.GetCompatibleBloodGroups("INVALID");

            // Assert
            act.Should().Throw<Exception>().WithMessage("Invalid blood group.");
        }

        [Fact]
        public async Task SearchBloodAsync_ShouldCallRepository_AndReturnResults()
        {
            // Arrange
            var request = new BloodSearchRequestDto
            {
                BloodGroup = "O+",
                UnitsRequired = 5
            };

            var expectedResponse = new List<BloodSearchResponseDto>
            {
                new BloodSearchResponseDto
                {
                    BloodBank = "Central Bank",
                    RequestedBloodGroup = "O+",
                    MatchedBloodGroup = "O+",
                    AvailableUnits = 10,
                    Available = true
                }
            };

            _repositoryMock.Setup(repo => repo.SearchBloodAsync(request))
                .ReturnsAsync(expectedResponse);

            // Act
            var result = await _service.SearchBloodAsync(request);

            // Assert
            result.Should().NotBeNull();
            result.Should().BeEquivalentTo(expectedResponse);
            _repositoryMock.Verify(repo => repo.SearchBloodAsync(request), Times.Once);
        }
    }
}
